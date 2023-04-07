import React, { useState } from "react";
import { getApiHandler } from "../../apihandler";
const Pagination = () => {
    const [contact, setContact] = React.useState([]);
    const [page, setPage] = React.useState(1);
    // const [size, setSize] = React.useState(5);
    const size = 5;
    const [length, setLength] = React.useState(0)
    const [nPage, setNPage] = React.useState(Number);
    const lastIndex = page * size;
    console.log("lastIndex", lastIndex)
    const FirstIndex = lastIndex - size;
    console.log("firstIndex", FirstIndex)
    const records = contact.slice(FirstIndex, lastIndex);
    // const nPage = Math.ceil(length / size);
    console.log("npage22222---", nPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1);
    console.log("number=--------", numbers)

    console.log("=====", nPage);
    const getContact = async () => {
        const temp = await getApiHandler(`/get?page=${page * 5 - 5}&size=${size}`);
        console.log("data: rajo======", temp);
        console.log("data:888= ", temp.response);
        if (temp.status === 200) {
            setContact(temp.response);
            setLength(temp.length);
            console.log("lenght---", temp.length)
            // console.log("99999===", Math.ceil(temp.length / size));
            setNPage(Math.ceil(temp.length / size))
            console.log('npage=================', nPage)
        }
    };
    console.log("npage---", nPage)
    React.useEffect(() => {
        getContact();
    }, [page]);
    return (
        <div>
            <table className="table">
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                </thead>
                <tbody>
                    {
                        contact.map((d, i) => {
                            return (
                                <tr key={i}>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.contact}</td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="'page-item">
                        <a href="#" className="page-link" onClick={prePage}>
                            prev
                        </a>
                    </li>
                    {
                        numbers?.map((n, i) => {
                            return (
                                <li className={`page-item ${page === n ? 'active' : ''}`} key={i}>
                                    <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
                                </li>)
                        })

                    }
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}>
                            next
                        </a>

                    </li>


                </ul>
            </nav>

        </div>
    )
    function prePage() {
        if (page !== 1) {
            setPage(page - 1)
        }

    }
    function nextPage() {
        if (page !== nPage) {
            setPage(page + 1)
        }


    }
    function changeCPage(n) {
        setPage(n)

    }
}
export default Pagination;