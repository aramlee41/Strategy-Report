function V2RegistrationPeople({ title, people, values, set, invalid }) {
  const toggle = id => set(values.includes(id) ? values.filter(v => v !== id) : [...values, id]);
  return <fieldset className={'registration-people '+(invalid ? 'is-required-empty' : '')}>
    <legend>{title} <span aria-hidden="true">*</span></legend>
    <p className="small muted">복수 선택할 수 있습니다.</p>
    <div className="registration-checks">
      {people.map(person => <label key={person.id || person.email} className={'registration-check '+(values.includes(person.id) ? 'selected' : '')}>
        <input type="checkbox" checked={values.includes(person.id)} onChange={() => toggle(person.id)} />
        <span><b>{person.name || person.email}</b><small>{person.team || (person.role === 'admin' ? '관리자' : '컨설턴트')}</small></span>
      </label>)}
    </div>
    {!people.length && <p className="form-error">등록된 {title} 계정이 없습니다. 계정 관리에서 먼저 추가해 주세요.</p>}
  </fieldset>;
}

function V2NewStudentDialog({ users, currentUser, save, close }) {
  const consultants = users.filter(person => person.role === 'staff');
  const admins = users.filter(person => person.role === 'admin');
  const [draft, setDraft] = useState(() => ({
    lastNameKo: '',
    firstNameKo: '',
    dob: '',
    program: '',
    consultantIds: currentUser?.role === 'staff' ? [currentUser.id] : [],
    adminIds: currentUser?.role === 'admin' ? [currentUser.id] : []
  }));
  const [submitted, setSubmitted] = useState(false);
  const set = (key, value) => setDraft(old => ({ ...old, [key]: value }));
  const missing = [
    !draft.lastNameKo.trim() && '성',
    !draft.firstNameKo.trim() && '이름',
    !draft.dob && '생년월일',
    !draft.program && '등록 프로그램',
    !draft.consultantIds.length && '상담자',
    !draft.adminIds.length && '어드민'
  ].filter(Boolean);
  const submit = () => {
    setSubmitted(true);
    if (missing.length) return;
    const base = blankStudent();
    const owners = [...new Set([...draft.consultantIds, ...draft.adminIds])];
    save({
      ...base,
      name: `${draft.lastNameKo} ${draft.firstNameKo}`.trim(),
      basic: { ...(base.basic || {}), lastNameKo: draft.lastNameKo.trim(), firstNameKo: draft.firstNameKo.trim(), dob: draft.dob },
      program: draft.program,
      consultantIds: draft.consultantIds,
      adminIds: draft.adminIds,
      owners,
      owner: draft.consultantIds[0] || draft.adminIds[0],
      registeredAt: new Date().toISOString(),
      registeredBy: currentUser?.id || ''
    });
  };
  return <PPDialog title="학생 등록" close={close} wide>
    <div className="ops registration-dialog">
      <p className="ops-muted">필수 기본정보와 담당자를 지정한 뒤 학생 레코드가 생성됩니다.</p>
      <div className="grid g4">
        <V2Field required label="성" val={draft.lastNameKo} set={value => set('lastNameKo', value)} />
        <V2Field required label="이름" val={draft.firstNameKo} set={value => set('firstNameKo', value)} />
        <V2Field required label="생년월일" type="date" val={draft.dob} set={value => set('dob', value)} />
        <V2Select required label="등록 프로그램" val={draft.program} set={value => set('program', value)} options={V2_PROGRAM_OPTIONS} />
      </div>
      <div className="registration-owner-grid">
        <V2RegistrationPeople title="상담자" people={consultants} values={draft.consultantIds} set={value => set('consultantIds', value)} invalid={submitted && !draft.consultantIds.length} />
        <V2RegistrationPeople title="어드민" people={admins} values={draft.adminIds} set={value => set('adminIds', value)} invalid={submitted && !draft.adminIds.length} />
      </div>
      {submitted && missing.length>0 && <div className="form-error-summary" role="alert">필수 항목을 입력해 주세요: {missing.join(', ')}</div>}
      <div className="ops-toolbar registration-actions">
        <OpsButton icon="X" onClick={close}>취소</OpsButton>
        <OpsButton icon="UserPlus" onClick={submit}>학생 등록</OpsButton>
      </div>
    </div>
  </PPDialog>;
}
