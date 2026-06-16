from pydantic import BaseModel


class Stage1ReportModel(BaseModel):
    student_alias: str
    summary_ko: str
    warnings: list[str] = []
