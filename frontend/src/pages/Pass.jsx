import passimg from '../img/pass.jpg'
import { SelectButton } from '../components/SelectButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { LoginButton } from '../components/LoginButton'
import { firework } from '../firework'

export function Pass(props) {
    const client = axios.create()
    const [isaccept, setIsaccept] = useState(props.userInfo.isaccept)
    const [errormsg, setErrormsg] = useState('')
    const [buttonText, setButtonText] = useState(props.userInfo.isaccept === '0' ? '제출하기' : '수정하기')
    useEffect(()=>{
        setInterval(firework, 1500)
    },[])
    const onClick = () => {
        setButtonText('제출 중...')
        client.post('https://welcome.hasclassmatching.com/api/accept', {
            'id':props.userInfo.id,
            'hash':props.userInfo.hash,
            'isaccept':isaccept
        })
        .then(res=>{
            setButtonText('제출 완료')
        })
        .catch(err=>{
            setButtonText('제출 실패')
            if (err.response.data.detail === "Forbidden") {
                setErrormsg('권한이 만료되었습니다. 새로고침하세요. 문의: 010-5616-2997')
            }
            setErrormsg('예기치 못한 에러 발생. 문의: 010-5616-2997')
        })
    }
    return(
        <center id='container'>
            <img src={passimg} alt="pass" width="300px" height="300px"/>
            <h2 id='resulttitlepass'>합격을 축하합니다!</h2>
            <h4 id='resulttext'>
            {props.userInfo.name} 지원자께서는 
            높은 경쟁률을 뚫고 
            Assembly 15기 모집에 
            합격하셨습니다! 
            ~</h4>
            <h4 id='resulttext'>
            2024년도 Assembly는 {props.userInfo.name}님과 함께 더 큰 미래를 그려나가고자 합니다.
            Assembly는 {props.userInfo.name} 지원자님을 기다리고 있겠습니다.
            </h4>
            <h4 id='resulttext'>
            금일 24시까지 Assembly와 
            함께해주실 수 있는지, 
            아래 버튼을 눌러 선택해주시면 
            감사하겠습니다.
            </h4>
            <h3 id='resulttext'>Assembly로 Assemble?</h3>
            <span>
                <SelectButton selected={isaccept === "1"} onClick={()=>setIsaccept("1")}>YES</SelectButton>
                <SelectButton selected={isaccept === "-1"} onClick={()=>setIsaccept("-1")}>NO</SelectButton>
            </span>
            <br/>
            <LoginButton onClick={onClick}>{buttonText}</LoginButton>
            <br/>
            <label id='loginerrormsg'>{errormsg}</label>
        </center>
    )
}