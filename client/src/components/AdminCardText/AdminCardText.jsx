import React from 'react'
import { Boton } from '../Boton/Boton'

import './adminCardText.css'
import docImage from '../../../public/icons/doc.svg';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export const AdminCardText = ({text, setTexts}) => {
  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  const openTextEdit = () => {
    navigate(`/admin/write/editor/${text.text_id}`);
  }

  const deleteText = async (text_id) => {
    const result = await fetchData('/admin/deleteText', 'DELETE', {text_id: text_id}, token);
    console.log(result);
  }

  return (
    <>
      <div className={`admin-card-text`}>
        <img src={docImage} alt="image text" className={`card-img ${text.text_status === 2?null:'card-img-blur'}`} onClick={openTextEdit}/>
        <h3 onClick={openTextEdit}>{text.text_title}</h3>
        <div className='d-flex justify-content-center gap-3'>
          <Boton onClick={openTextEdit} icon="bi bi-pen" aspecto='btn-rounded-ok btn-card btn-edit' />
          <Boton onClick={null} icon="bi bi-trash" aspecto='btn-rounded-err btn-card btn-delete' />
        </div>
      </div>
    
    </>
  )
}