
const UserEditModal = () => {
  return (
    <>
      <h2>UserEditModal</h2>
      <button>Close</button>
      <div>회원 정보 수정</div>
      <input type="email" placeholder="Nickname" />
      <input type="password" placeholder="New Password" />
      <input type="password" placeholder="Pasword Check" />
      <button>수 정</button>
    </>
  )
}

export default UserEditModal;