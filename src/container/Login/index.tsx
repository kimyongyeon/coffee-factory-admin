import React from 'react'

interface Props {
    userId: string;
    password: string;
}

const index = (props: Props) => {
    return (
        <div>
            <h1>login 화면 입니다.</h1>
            {props.userId}
            {props.password}
        </div>
    )
}

export default index
