from __future__ import annotations

import argparse
import json
from pathlib import Path

from boarding_strategy.legacy_excel.table_extractor import import_legacy_workbook, inspect_and_import
from boarding_strategy.legacy_excel.workbook_inspector import inspect_workbook
from boarding_strategy.legacy_model.legacy_parity import compare_legacy_parity
from boarding_strategy.legacy_model.legacy_prediction import DEFAULT_CATEGORY_THRESHOLDS, LegacyPredictionEngine
from boarding_strategy.legacy_model.legacy_schemas import LegacyStage1Input
from boarding_strategy.legacy_model.legacy_school_data import load_schools_csv
from boarding_strategy.report import render_full_report, render_stage1_report, render_stage2_report
from boarding_strategy.stage1 import run_stage1
from boarding_strategy.stage2 import run_stage2
from boarding_strategy.stage2.schemas import Stage2Input


def load_jsonish(path: str | Path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def build_prediction_engine(config_path: str | Path | None) -> LegacyPredictionEngine:
    if not config_path:
        return LegacyPredictionEngine()
    cfg = load_jsonish(config_path)
    thresholds = [(x["low"], x["high"], x["label"]) for x in cfg.get("category_thresholds", [])] or DEFAULT_CATEGORY_THRESHOLDS
    return LegacyPredictionEngine(legacy_global_adjustment=cfg.get("legacy_global_adjustment", 0), category_thresholds=thresholds)


def cmd_inspect(args):
    manifest = inspect_workbook(args.workbook, args.out)
    print(json.dumps({"sheets": manifest["sheet_count"], "out": args.out}, ensure_ascii=False))


def cmd_import(args):
    summary = import_legacy_workbook(args.workbook, args.out_dir, anonymize=str(args.anonymize).lower() != "false")
    print(json.dumps(summary, ensure_ascii=False))


def cmd_validate(args):
    manifest = load_jsonish(args.manifest)
    extracted = Path(args.extracted_dir)
    required = ["legacy_stage1_inputs.csv", "legacy_schools.csv", "toefl_conversion.csv", "gpa_conversion.csv"]
    missing = [x for x in required if not (extracted / x).exists()]
    print(json.dumps({"workbook": manifest.get("workbook_name"), "missing": missing, "valid": not missing}, ensure_ascii=False))


def cmd_stage1(args):
    student = LegacyStage1Input.model_validate(load_jsonish(args.student))
    schools = load_schools_csv(args.schools)
    score, predictions = run_stage1(student, schools, prediction_engine=build_prediction_engine(args.legacy_config))
    render_stage1_report(student, score, predictions, args.out)
    print(json.dumps({"out": args.out, "weighted_application_strength": score.weighted_application_strength, "schools": len(predictions)}, ensure_ascii=False))


def cmd_stage2(args):
    student = LegacyStage1Input.model_validate(load_jsonish(args.student_stage1))
    stage2 = Stage2Input.model_validate(load_jsonish(args.student_stage2))
    schools = load_schools_csv(args.schools)
    score, predictions = run_stage1(student, schools, prediction_engine=build_prediction_engine(args.legacy_config))
    analysis = run_stage2(score, predictions, stage2)
    render_stage2_report(analysis, args.out)
    print(json.dumps({"out": args.out, "scenarios": len(analysis.scenario_results)}, ensure_ascii=False))


def cmd_full(args):
    student = LegacyStage1Input.model_validate(load_jsonish(args.student_stage1))
    stage2 = Stage2Input.model_validate(load_jsonish(args.student_stage2))
    schools = load_schools_csv(args.schools)
    score, predictions = run_stage1(student, schools, prediction_engine=build_prediction_engine(args.legacy_config))
    analysis = run_stage2(score, predictions, stage2)
    render_full_report(student, score, predictions, analysis, args.out)
    print(json.dumps({"out": args.out}, ensure_ascii=False))


def cmd_compare(args):
    student = LegacyStage1Input.model_validate(load_jsonish(args.student_alias)) if Path(args.student_alias).exists() else LegacyStage1Input(student_alias=args.student_alias)
    compare_legacy_parity(student, args.out)
    print(json.dumps({"out": args.out}, ensure_ascii=False))


def main(argv=None):
    parser = argparse.ArgumentParser(prog="boarding-strategy")
    sub = parser.add_subparsers(dest="command", required=True)
    p = sub.add_parser("inspect-legacy-workbook")
    p.add_argument("--workbook", required=True)
    p.add_argument("--out", required=True)
    p.set_defaults(func=cmd_inspect)
    p = sub.add_parser("import-legacy-workbook")
    p.add_argument("--workbook", required=True)
    p.add_argument("--out-dir", required=True)
    p.add_argument("--anonymize", default="true")
    p.set_defaults(func=cmd_import)
    p = sub.add_parser("validate-legacy-migration")
    p.add_argument("--manifest", required=True)
    p.add_argument("--extracted-dir", required=True)
    p.set_defaults(func=cmd_validate)
    p = sub.add_parser("run-stage1")
    p.add_argument("--student", required=True)
    p.add_argument("--schools", required=True)
    p.add_argument("--legacy-config", required=True)
    p.add_argument("--out", required=True)
    p.set_defaults(func=cmd_stage1)
    p = sub.add_parser("run-stage2")
    p.add_argument("--student-stage1", required=True)
    p.add_argument("--student-stage2", required=True)
    p.add_argument("--schools", required=True)
    p.add_argument("--projects")
    p.add_argument("--legacy-config", required=True)
    p.add_argument("--out", required=True)
    p.set_defaults(func=cmd_stage2)
    p = sub.add_parser("full-report")
    p.add_argument("--student-stage1", required=True)
    p.add_argument("--student-stage2", required=True)
    p.add_argument("--schools", required=True)
    p.add_argument("--projects")
    p.add_argument("--history")
    p.add_argument("--legacy-config", required=True)
    p.add_argument("--out", required=True)
    p.set_defaults(func=cmd_full)
    p = sub.add_parser("compare-legacy-parity")
    p.add_argument("--workbook", required=True)
    p.add_argument("--student-alias", required=True)
    p.add_argument("--out", required=True)
    p.set_defaults(func=cmd_compare)
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    main()
