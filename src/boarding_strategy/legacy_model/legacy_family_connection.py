from __future__ import annotations

from .legacy_schemas import LegacyFamilyConnectionImpact, LegacyFamilyConnectionProfile, LegacySchool


RELATIONSHIP_SCORES = {
    "Parent attended the school": 5.0,
    "Grandparent attended the school": 3.0,
    "Sibling currently attends the school": 4.5,
    "Sibling graduated from the school": 4.0,
    "Aunt or uncle attended the school": 1.5,
    "Cousin attended the school": 1.0,
    "Other family connection": 0.5,
}
STRENGTH_MULTIPLIERS = {
    "Strong": 1.3,
    "Moderate": 1.0,
    "Weak": 0.7,
    "Unknown": 0.8,
}
TOP_TIER_LEGACY_SENSITIVITY = {
    "phillips exeter academy": (0.7, True, 3.0, 0.35),
    "phillips academy andover": (0.8, False, 3.5, 0.35),
    "deerfield academy": (0.8, False, 3.5, 0.35),
    "hotchkiss school": (0.8, False, 3.5, 0.35),
    "choate rosemary hall": (0.8, False, 3.5, 0.35),
    "lawrenceville school": (0.8, False, 3.5, 0.35),
    "st. paul's school": (0.8, False, 3.5, 0.35),
}


def _norm(value: str | None) -> str:
    return " ".join(str(value or "").strip().lower().replace("’", "'").split())


def _school_config(school: LegacySchool) -> tuple[float, bool, float, float]:
    suggested = TOP_TIER_LEGACY_SENSITIVITY.get(_norm(school.school_name))
    if suggested and (
        school.legacy_sensitivity_multiplier,
        school.sibling_priority_enabled,
        school.max_legacy_contribution,
        school.legacy_weight,
    ) == (1.0, False, 3.5, 0.35):
        return suggested
    return (
        school.legacy_sensitivity_multiplier,
        school.sibling_priority_enabled,
        school.max_legacy_contribution,
        school.legacy_weight,
    )


def _find_matching_profile(
    profiles: list[LegacyFamilyConnectionProfile],
    school: LegacySchool,
) -> LegacyFamilyConnectionProfile | None:
    evaluated = _norm(school.school_name)
    for profile in profiles:
        if profile.has_legacy_connection != "Yes":
            continue
        if _norm(profile.legacy_school_name) == evaluated:
            return profile
    return None


def calculate_legacy_family_connection(
    profiles: list[LegacyFamilyConnectionProfile],
    school: LegacySchool,
) -> LegacyFamilyConnectionImpact:
    explicit = next((p for p in profiles if p.has_legacy_connection != "Yes"), None)
    profile = _find_matching_profile(profiles, school)
    if not profile:
        answer = explicit.has_legacy_connection if explicit else "No"
        note = "No reported legacy or family connection was considered for this school."
        if answer == "Prefer not to answer":
            note = "Legacy or family connection information was not provided and was not factored into this school evaluation."
        return LegacyFamilyConnectionImpact(has_legacy_connection=answer, explanation=note)

    warnings: list[str] = []
    if not profile.legacy_school_name:
        warnings.append("legacy_school_name is required when has_legacy_connection is Yes.")
    if not profile.legacy_relationship_type:
        warnings.append("legacy_relationship_type is required when has_legacy_connection is Yes.")
    if warnings:
        return LegacyFamilyConnectionImpact(
            has_legacy_connection="Yes",
            legacy_school_name=profile.legacy_school_name,
            legacy_relationship_type=profile.legacy_relationship_type,
            legacy_connection_strength=profile.legacy_connection_strength,
            legacy_notes=profile.legacy_notes,
            matched_evaluated_school=True,
            warnings=warnings,
            explanation="Legacy information was present but incomplete, so no contribution was applied.",
        )

    relationship_score = RELATIONSHIP_SCORES.get(profile.legacy_relationship_type or "", 0.0)
    strength_multiplier = STRENGTH_MULTIPLIERS.get(profile.legacy_connection_strength or "Unknown", 0.8)
    sensitivity, sibling_priority, max_contribution, weight = _school_config(school)
    if profile.legacy_relationship_type == "Sibling currently attends the school" and sibling_priority:
        sensitivity = min(sensitivity + 0.2, 1.4)
    subscore = min(relationship_score * strength_multiplier * sensitivity, 10.0)
    contribution = min(subscore * weight, max_contribution)
    return LegacyFamilyConnectionImpact(
        has_legacy_connection="Yes",
        legacy_school_name=profile.legacy_school_name,
        legacy_relationship_type=profile.legacy_relationship_type,
        legacy_connection_strength=profile.legacy_connection_strength or "Unknown",
        legacy_notes=profile.legacy_notes,
        legacy_relationship_score=relationship_score,
        legacy_strength_multiplier=strength_multiplier,
        legacy_school_sensitivity=sensitivity,
        legacy_subscore=round(subscore, 2),
        legacy_contribution=round(contribution, 2),
        matched_evaluated_school=True,
        applied=contribution > 0,
        explanation=(
            "Legacy was applied as a small capped contextual modifier. "
            "It does not replace academics, English proficiency, interview quality, recommendations, extracurricular strength, school fit, or character evaluation."
        ),
    )
