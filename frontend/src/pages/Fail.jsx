export function Fail(props) {
    return (
        <center id='failcontainer'>
            <h2 id='resulttitle'>{props.userInfo.name} 지원자님께</h2>
            <h4 id='resulttext'>
                안녕하세요, Assembly입니다.
            </h4>
            <h4 id='resulttext'>
                Assembly의 신입 부원 모집에 지원해주셔서 진심으로 감사드립니다.
            </h4>
            <h4 id='resulttext'>
                {props.userInfo.name} 지원자님의 뛰어난 역량과 잠재력에도 
                불구하고, 아쉽지만 제한된 모집 인원으로 
                인해 함께 할 수 없게 되었습니다.
            </h4>
            <h4 id='resulttext'>
                본 결과는 역량 순이 아니라 
                저희 동아리의 인재상과 조금 다른 부분에 
                대한 판단의 결과이니, 더 좋은 기회에서 
                꿈을 마음껏 펼치실 것이라 확신합니다.

                다시한번 지원해주셔서 감사합니다.
            </h4>
        </center>
    )
}