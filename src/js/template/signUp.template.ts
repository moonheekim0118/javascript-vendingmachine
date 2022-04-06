const signUpTemplate = {
  input: () => `
  <div>
    <label for="email">이메일</label>
    <input id="email" class="input" placeholder="이메일 주소를 입력해주세요" type="email">
  </div>
  <div>
    <label for="name">이름</label>
    <input id="name" class="input" placeholder="이름을 입력해주세요" >
  </div>
  <div>
    <label for="password">비밀번호</label>
    <input id="password" class="input" placeholder="비밀번호를 입력해주세요" type="password">
  </div>
    <button  class="button">가입하기</button>
    `,
};

export default signUpTemplate;
