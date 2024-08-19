// import React from 'react';
// import './signup.css'; 
// import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import LocalSignupFlow from './LocalSignupFlow';
// import UserInfoForm from './UserInfoForm';
// import Success from './Success';

// function SignupOptions() {
//     const navi = useNavigate();
//     const clickHandler1 = () => {
//         navi("/signup/local");
//     }

//     return (
//         <div>
//             <h2>어카처 회원가입 방법을 선택해주세요.</h2>

//             <Button className="divStyle1" onClick={clickHandler1}>내국인 <br /> 휴대폰으로 가입하기</Button>
//             <Button className="divStyle1" onClick={clickHandler1}>외국인 <br /> 구글 이메일로 가입하기</Button>
//         </div>
//     );
// }

// function Signup() {

//     return (
//         <div>
//             <Routes>
//                 <Route path="/" element={<SignupOptions />}></Route>
//                 <Route path="/local" element={<LocalSignupFlow/>}></Route>
//                 <Route path = "/userInfo" element={<UserInfoForm    />}/>
//                 <Route path = "/success" element={<Success    />}/>
//             </Routes>
//             <Outlet></Outlet>
//         </div>
//     );
// }

// export default Signup;