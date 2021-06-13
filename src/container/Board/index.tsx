import React from 'react'

interface Props {
    bno: string;
    title: string; 
    content: string; 
}

const index = (props: Props) => {
    return (
        <div>
            <h1>게시판 관리 입니다.</h1>
            번호: {props.bno} <br/>
            제목: {props.title} <br/>
            내용: {props.content} <br/>
        </div>
    )
}

export default index
