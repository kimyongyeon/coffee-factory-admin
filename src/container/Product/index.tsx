import { DatePicker, Input } from 'antd';
import React from 'react';
import PagingList from '../../component/common/PagingList';
const { Search } = Input;

const { RangePicker } = DatePicker;
interface Props {
    history: any
}

const index = (props: Props) => {
    const onClickEdit = (e: any, item: any) => {
        props.history.push({
            pathname: `product/detail`,
            type: 'E',
            item: item
        });
    }

    const columns = [
        {
            title: '상품코드',
            dataIndex: '_id',
            key: '_id',
            width: 100,
            render: (text: string, item: any) => <a onClick={() => onClickEdit(this, item)}>{text}</a>
        },
        {
            title: '상품명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '가격',
            dataIndex: 'price',
            key: 'price',
            width: 100,
        },
        {
            title: '용량',
            dataIndex: 'volume',
            key: 'volume',
            width: 100,
        },
        {
            title: '크기',
            dataIndex: 'size',
            key: 'size',
            width: 100,
        },
        {
            title: '정렬',
            dataIndex: 'sort',
            key: 'sort',
            width: 100,
        },
        {
            title: '사용유무',
            dataIndex: 'useYn',
            key: 'useYn',
            width: 100,
        },
    ];


    const onClickReg = (e: any) => {
        props.history.push({
            pathname: "product/detail",
            type: 'R'
        });
    }

    return (
        <div>
            <PagingList
                regClick={onClickReg}
                history={history}
                colums={columns}
                pathName={'product'}
                searchName={'상품 검색'}
                hostName={'http://coffee-oda.shop:3000/api/'}
            />
        </div>
    )
}

export default index
