import { Row, Col} from 'react-bootstrap';


export const AdminWriteUserList = ({users}) => {
  return (
    <Row className='justify-content-center g-4 mb-4'>
        {users.map((user)=>{
          return(
            <Col xs={12} key={user.user_id}>
              {user.user_id}
            </Col>
          )
        })}
      </Row>
  )
}
