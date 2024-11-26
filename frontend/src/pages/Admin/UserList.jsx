import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import {toast} from 'react-toastify';
import {useDeleteUserMutation, useGetUserDetailsQuery,
    useUpdateUserMutation} from '../../redux/api/usersApiSlice'

const UserList = () => {
  return (
    <div>UserList</div>
  )
}

export default UserList