import React, {useEffect, useState} from "react";
import s from "./Github.module.css"
import axios from "axios";

type SearchUserType = {
    id: number,
    login: string

}

type SearchResult = {
    items: SearchUserType[]
}

const Github = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)

    const [users, setUsers] = useState<SearchUserType[]>([])

    const [tempSearch, setTempSearch] = useState('it-kamasutra')

    const [termSearch, setTermSearch] = useState('it-kamasutra')


    useEffect(() => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${termSearch}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }, [termSearch])

    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    return <div className={s.container}>
        <div>
            <div>
                <input type="" placeholder='search' value={tempSearch}
                       onChange={(e) => setTempSearch(e.currentTarget.value)}
                />
                <button
                    onClick={() => {
                        setTermSearch(tempSearch)
                    }}>ok
                </button>
            </div>
            <div>
                <ul>
                    {
                        users.map(user => <li
                            className={selectedUser === user ? s.selected : ''}
                            key={user.id}
                            onClick={() => {
                                setSelectedUser(user)
                            }}>
                            {user.login}
                        </li>)
                    }
                </ul>
            </div>
        </div>
        <div>
            <h2>Username</h2>
            <div>Details</div>
        </div>
    </div>
}

export default Github