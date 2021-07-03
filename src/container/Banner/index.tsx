import React from 'react';
import PagingList from '../../component/common/PagingList';

// 테스트 데이터가 필요하다. 

interface Props {
    history: any;
}

const apiName = 'banner';

const index = (props: Props) => {

    const onClickEdit = (_e: any, item: any) => {
        props.history.push({
            pathname: `${apiName}/detail`,
            type: 'E',
            item: item
        });
    }

    // props 속성을 쓰는 변수는 부모에서 트리거를 걸어야 함.
    const onClickReg = (_e: any) => {
        // alert('등록하기 버튼 클릭!');
        props.history.push({
            pathname: `${apiName}/detail`,
            type: 'R'
        });
    }

    const columns = [
        {
            title: '배너아이디',
            dataIndex: 'bannerId',
            key: 'bannerId',
            render: (text: string, item: any) =>
                <a onClick={() => onClickEdit(this, item)}>{text}</a>
        },
        {
            title: '배너명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '이미지주소',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text:string) => <img src={text} width='200' height='50'></img>,
        },
        {
            title: '가로크기',
            dataIndex: 'width',
            key: 'width',
        },
        {
            title: '세로크기',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: '위치',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '사용유무',
            dataIndex: 'useYn',
            key: 'useYn',
        },
    ];

    return (
        <div>
            <PagingList
                regClick={onClickReg}
                history={history}
                colums={columns}
                pathName={'20210702'}
                searchName={'배너'}
                hostName={'http://coffee-oda.shop:3000/api/banner/all/'}
            />
        </div>
    )
}

export default index
