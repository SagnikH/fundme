import {Form, Button} from 'react-bootstrap';
import styles from '../styles/NewRequest.module.css'

const newRequest = () => {

    return ( 
        <div className='d-flex flex-column justify-content-between'>
            <Form className={styles.form}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='text-white'>Demanded Amount</Form.Label>
                    <Form.Control type="email" placeholder="Demanded Amount" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>Minimum Contribution</Form.Label>
                    <Form.Control type="password" placeholder="Minimum Contribution" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className='text-white'>Description</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder="Description"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='text-white'>Recipient ID</Form.Label>
                    <Form.Control type="password" placeholder="Recipient ID" />
                </Form.Group>

                <Button variant="success" type="submit" className='mt-3'>
                    Submit
                </Button>
            </Form>
        </div>
     );
}
 
export default newRequest;