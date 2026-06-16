# Migration Audit

Workbook: `미한 보딩 입학 예측 모델.xlsx`
Sheets: 18

## Application Rubric
- Used rows: 1 to 28
- Max columns: 48
- Formula count: 5
- Likely header rows: [2, 4, 5, 6, 7]
- Formula sample: `=sum(E4:E27)`

## 최현우
- Used rows: 2 to 28
- Max columns: 48
- Formula count: 5
- Likely header rows: [2, 4, 5, 6, 7]
- Formula sample: `=sum(E4:E27)`

## 박지후
- Used rows: 2 to 28
- Max columns: 48
- Formula count: 5
- Likely header rows: [2, 4, 5, 6, 7]
- Formula sample: `=sum(E4:E27)`

## Official - Inboardy Score Look-
- Used rows: 2 to 144
- Max columns: 41
- Formula count: 956
- Likely header rows: [3, 4, 5, 6, 19]
- Formula sample: `=RIGHT(D3,2)&"기"`

## Full-Schools Analysis
- Used rows: 2 to 104
- Max columns: 41
- Formula count: 3077
- Likely header rows: [2, 5]
- Formula sample: `='Official - Inboardy Score Look-'!F3`

## School List Analysis
- Used rows: 2 to 24
- Max columns: 41
- Formula count: 618
- Likely header rows: [2, 4]
- Formula sample: `='Official - Inboardy Score Look-'!F3`

## Compatability Backend
- Used rows: 1 to 446
- Max columns: 183
- Formula count: 4669
- Likely header rows: [3, 4, 5, 6, 7]
- Formula sample: `=IF(H4 < 450, "Low (less than 450)", IF( H4 > 800, "High (more than 800)", "Medium (450 - 800)"))`

## Misc. Backend Stuff
- Used rows: 1 to 1972
- Max columns: 44
- Formula count: 13971
- Likely header rows: [2, 3, 4, 5, 6]
- Formula sample: `=D2&" "&E2&" "&F2`

## Sheet23
- Used rows: 2 to 27
- Max columns: 48
- Formula count: 1
- Likely header rows: [2, 4, 5, 6, 7]
- Formula sample: `=sum(E4:E26)`

## Student Input  Edit
- Used rows: 1 to 35
- Max columns: 27
- Formula count: 34
- Likely header rows: [1, 4, 5, 6, 7]
- Formula sample: `=IFERROR(VLOOKUP(B4 & " " & C4,'Inboardy - Student Input'!A:AI,18, FALSE),"")`

## Inboardy - Student Input
- Used rows: 1 to 983
- Max columns: 76
- Formula count: 980
- Likely header rows: [1, 2, 3, 4, 5]
- Formula sample: `=IFERROR(IFS(D3="38기", "season_38", D3="36기", "season_36", D3="34기", "season_34", D3="32기", "season_32", D3="30기", "season_30", D3="28기", "season_28", D3="26기", "season_26", D3="24기", "season_24") & " " & B3, "")`

## Inboardy Score Backend
- Used rows: 1 to 624
- Max columns: 41
- Formula count: 10926
- Likely header rows: [1, 2]
- Formula sample: `=AVERAGE(K3:M3)`

## School Rankings
- Used rows: 1 to 104
- Max columns: 72
- Formula count: 1596
- Likely header rows: [3, 4, 8, 9, 10]
- Formula sample: `=HYPERLINK("https://www.youtube.com/watch?v=pjxgqxKcCF4&ab_channel=PhillipsExeterAcademy","link")`

## Full School Rankings
- Used rows: 1 to 118
- Max columns: 94
- Formula count: 5283
- Likely header rows: []
- Formula sample: `=IFERROR(__xludf.DUMMYFUNCTION("IMPORTRANGE(""https://docs.google.com/spreadsheets/d/1-UytBbpz5Q5CNsuVP24rS0CEVOf1-12mOqtpPxg1_SM/edit?gid=728338816#gid=728338816"", ""Full School Rankings!A1:CO150"")"),"")`

## Inboardy Set-up
- Used rows: 1 to 17
- Max columns: 26
- Formula count: 27
- Likely header rows: []
- Formula sample: `=TEXT('Inboardy Score Backend'!B9, "0.0")`

## Sheet17
- Used rows: 1 to 93
- Max columns: 12
- Formula count: 184
- Likely header rows: [1, 2, 3, 4, 5]
- Formula sample: `=RANK(E2,$E$2:$E$93, TRUE) `

## School Preference Results
- Used rows: 1 to 12
- Max columns: 32
- Formula count: 0
- Likely header rows: [1, 2, 3, 4, 5]

## Sheet19
- Used rows: 1 to 94
- Max columns: 6
- Formula count: 0
- Likely header rows: [1, 2, 3, 4, 6]

## Privacy
Private extraction outputs are intentionally ignored by git.