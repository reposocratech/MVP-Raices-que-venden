import React from 'react'
import { Boton } from '../Boton/Boton'
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

import './adminCardText.css'

export const AdminCardText = ({text, textsChanged}) => {
  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  const openTextEdit = () => {
    navigate(`/admin/write/editor/${text.text_id}`);
  }

  const deleteTextLogical = async () => {
    const result = await fetchData('/admin/deleteTextLogical', 'PUT', {text_id: text.text_id}, token);
    console.log(result);
    textsChanged();
  }

  const restoreText = async () => {
    const result = await fetchData('/admin/restoreText', 'PUT', {text_id: text.text_id}, token);
    console.log(result);
    textsChanged();
  }

  const deleteTextTotal = async () => {
    const result = await fetchData('/admin/deleteTextTotal', 'DELETE', {text_id: text.text_id}, token);
    console.log(result);
    textsChanged();
  }

  return (
    <>
      <div className={`admin-card-text`}>

        <img src={`/public/icons/doc-${text.text_status}.png`} alt="image text" className={`card-img`} onClick={openTextEdit}/>

        <h3 onClick={openTextEdit} className='text-clamp'>{text.text_title}</h3>
        <div className='d-flex justify-content-center gap-3'>
          {text.text_status!==3?
          <>
          <Boton onClick={openTextEdit} icon="bi bi-pen" aspecto='btn-rounded-ok btn-card btn-edit' />
          <Boton onClick={deleteTextLogical} icon="bi bi-trash" aspecto='btn-rounded-err btn-card btn-delete'/>
          </>
          :
          <>
          <Boton onClick={restoreText} icon="bi bi-arrow-counterclockwise" aspecto='btn-rounded-ok btn-card btn-edit' />
          <Boton onClick={deleteTextTotal} icon="bi bi-trash" aspecto='btn-rounded-err btn-card btn-delete'/>
          </>
          }
          
        </div>
      </div>
    
    </>
  )
}