# KGU QUIZ — ref.pdf 기반 Java Swing UI 데모

현재 버전은 사용자가 제공한 `ref.pdf`의 13개 화면을 기준으로 다시 제작했습니다. 이전 카테고리·설정 화면 대신 PDF의 3개 파트와 결과·오답 복습 흐름을 사용합니다.

## 실행

Java 17 이상에서 다음 명령으로 실행합니다. 이미지와 글꼴은 JAR에 포함되어 있어 JAR 하나만 복사해 실행할 수 있습니다.

```sh
java -jar CampusQuiz-demo.jar
```

소스 실행(JDK 17 이상): Linux/macOS는 `./run.sh`, Windows는 `run.bat`. IDE에서는 프로젝트 루트에서 `src/CampusQuiz.java`의 `main()`을 실행하세요.

JAR 재생성: `python3 scripts/build_demo.py`.

## PDF에 대응하는 13개 화면

| PDF | 구현 화면 |
|---|---|
| 1 | 시작: 캠퍼스 사진·원본 손글씨·시작 버튼 |
| 2 | 이용 안내 |
| 3 | 사진을 사용한 3개 파트 선택 |
| 4 | 파트 소개 |
| 5 | 답변 선택 전 문제 |
| 6 | 검은 배경으로 표시하는 선택 답안 |
| 7 | 정답 해설 |
| 8 | 오답·정답 비교와 해설 |
| 9 | 종료 확인 모달 |
| 10 | 파트 완료 |
| 11 | 최종 결과 |
| 12 | 오답 복습 목록 |
| 13 | 오답 상세 복습 |

## 화면 체험

시작 → 파트 선택 → 파트 소개 → 답변 선택 → 다음 문제 → 정답/오답 해설 → 파트 완료 → 다음 파트 → 최종 결과 → 오답 복습.

첫 파트는 A를 선택하면 정답 화면, B~D는 오답 화면을 보여줍니다. 종료 확인에서 계속 풀기를 누르면 선택 답안이 유지되고, 종료하면 파트 선택 화면으로 돌아갑니다. 복습 목록의 항목을 누르면 상세 화면으로 이동합니다. Tab과 Space로 Swing 버튼을 조작할 수 있습니다.

UI 데모를 위한 임시 상태만 존재합니다. PDF의 `3/5`, 파트 점수 `40/50`, 최종 점수 `120/150`, 소요 시간 `04:32`, 오답 3개는 고정 예시입니다. 각 파트는 문제 화면 1개로 시연되며 15문항 출제·실제 채점·저장 기능은 구현하지 않았습니다. 화면 문구는 디자인을 따라 표시됩니다.

## 크기와 리소스

1000×1080 논리 좌표를 기준으로 전체 화면과 버튼 영역을 같은 비율로 확대·축소합니다. 기본 창은 800×864, 최소 창은 600×648이며 스크롤은 없습니다. 넓은 창에서는 비율을 유지하고 여백을 둡니다.

PDF의 타이틀 바를 포함한 디자인을 재현하기 위해 창 장식은 Swing에서 그립니다. 최소화·최대화·닫기와 타이틀 바 드래그를 지원합니다.

사진, 손글씨, 결과 아이콘을 PDF에서 추출해 로컬 파일로 포함했습니다. 전체 UI를 PNG 한 장으로 붙이지 않고 텍스트·버튼·진행 막대·패널을 직접 구성했습니다. 글꼴은 Noto Sans 계열을 번들링했으며 Java의 글꼴 렌더링 차이로 원본의 모든 글자 윤곽이 동일하지는 않습니다. [리소스 출처와 배치](assets/README.md)

## 미리보기

`./run.sh --preview` 또는 `java -jar CampusQuiz-demo.jar --preview`로 13개 실제 Swing 화면 PNG를 생성합니다.

- [시작](previews/pdf-design/01-welcome.png)
- [파트 선택](previews/pdf-design/03-parts.png)
- [선택 답안](previews/pdf-design/06-selected.png)
- [오답 해설](previews/pdf-design/08-incorrect.png)
- [종료 확인](previews/pdf-design/09-exit.png)
- [최종 결과](previews/pdf-design/11-final.png)
- [오답 복습](previews/pdf-design/13-review_detail.png)

기존 `previews/light-*`, `previews/dark-*`, `design/` 자료는 이전 버전 기록이며 현재 기준은 `ref.pdf`와 `previews/pdf-design/`입니다.

## 검증

Java 17 타깃 컴파일, 13개 화면 시각 검토 및 4개 창 크기에서 총 52회 렌더링을 확인했습니다. 버튼 이벤트로 답안 선택 전 비활성 상태, 정답/오답 해설, 모달의 배경 조작 차단·취소·종료, 3개 파트 이동, 최종 결과, 복습 이동과 초기화를 검증했습니다.

```sh
javac --release 17 -encoding UTF-8 -cp out -d out checks/UiSmoke.java
java -cp out UiSmoke
```

현재 환경은 X11 디스플레이 연결이 불가능해 실제 운영체제 창의 수동 조작은 확인하지 못했습니다.
