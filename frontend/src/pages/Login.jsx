import AssemblyIcon from '../img/Assembly_Square_Logo.png'
import { LoginInput } from '../components/LoginInput'
import { LoginButton } from '../components/LoginButton'
import axios from 'axios';
import { useState } from 'react';

export function Login(props) {
    const client = axios.create()
    const [buttonText, setButtonText] = useState('면접 결과 확인하기')
    const [errMessage, setErrMessage] = useState('')
    const [userInfo, setUserInfo] = useState({
        id: '',
        pw: ''
    })

    const onChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const onClick = () => {
        setButtonText('로딩 중...')
        client.post('https://welcome.hasclassmatching.com/api/login', userInfo)
        .then(res=>{
            setButtonText('면접 결과 확인하기')
            setErrMessage('')
            props.setUserInfo(res.data)
        })
        .catch(err=>{
            setButtonText('면접 결과 확인하기')
            if (err.response.data.detail === "Unauthorized") {
                setErrMessage('인트라넷 계정이 잘못되었습니다. 확인해주세요.')
            }
            else if(err.response.data.detail === "Forbidden") {
                setErrMessage('면접자 명단에 없는 계정입니다. 확인해주세요. 문의: 010-5616-2997')
            } else {
                setErrMessage('예기치 못한 에러 발생. 문의: 010-5616-2997')
            }
        })
    }

    return (
        <div>
            <img src={AssemblyIcon} alt="Assembly Square Logo" id='assemblylogo'/>
            <h1 id='Assembly'>Assembly</h1>
            <LoginInput label="인트라넷 아이디" type="email" name='id' onChange={onChange}/>
            <LoginInput label="인트라넷 비밀번호" type="password" name='pw' onChange={onChange}/>
            <LoginButton onClick={onClick}>{buttonText}</LoginButton>
            <br/>
            <label id='loginerrormsg'>{errMessage}</label>
        </div>
    )
}