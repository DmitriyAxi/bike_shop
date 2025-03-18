import {Button, Modal} from "react-bulma-components";
import {useState} from "react"
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import "./OrderForm.css"

enum DeliveryMethod {
    Nothing= "",
    Pickup = "Pickup",
    Courier = "Courier",
    RussiaPost = "RussiaPost"
}

enum PaymentType {
    Nothing = "",
    Cash = "Cash",
    Card = "Card",
}

interface IOrderForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    deliveryMethod: DeliveryMethod;
    paymentType: PaymentType
}

export default function OrderForm() {
    const  [isActive, setIsActive] = useState(false)

    const handleCloseModal = () => {
        setIsActive(false)
    }
    
    return (
        <>
            <Button color="primary" mt={6} onClick={() => setIsActive(true)}>Make order</Button>
            <Modal
                show={isActive}
                showClose={true}
                onClose={handleCloseModal}
                closeOnBlur={true}
                closeOnEsc={true}
            >
                <Modal.Card>
                    <Modal.Card.Header>
                        <Modal.Card.Title>
                            Order info
                        </Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <Formik
                            initialValues={{ 
                                fullName: '', 
                                email: '', 
                                phone: '', 
                                address: '', 
                                deliveryMethod: DeliveryMethod.Nothing ,
                                paymentType: PaymentType.Nothing
                            }}
                            validate={values => {
                                const errors : Partial<Record<keyof IOrderForm, string>> = {};
                                if (!values.fullName) {
                                    errors.fullName = 'Required';
                                }
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Required';
                                } else if (!/^\+?\d{10,15}$/i.test(values.phone)) {
                                    errors.phone = 'Invalid phone number';
                                }
                                if (!values.address) {
                                    errors.address = 'Required';
                                }
                                if (values.deliveryMethod === DeliveryMethod.Nothing) {
                                    errors.deliveryMethod = 'Required'; 
                                }
                                if (values.paymentType === PaymentType.Nothing) {
                                    errors.paymentType = 'Required';
                                }
                                return errors;
                            }}
                            onSubmit={(
                                values: IOrderForm,
                                { setSubmitting }: FormikHelpers<IOrderForm>
                            ) => {
                                console.log('1', values)
                                console.log('setSubmitting', setSubmitting)
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 500);
                            }}
                        >
                            {() => (
                                <Form className="blockSection">
                                    <label htmlFor="fullName" className="fontLabel">Full name:</label>
                                    <Field type="text" name="fullName" placeholder="Ivanov Ivan Ivanovich" />
                                    <ErrorMessage name="fullName" component="div" className="errorMessage" />
                                    <label htmlFor="email" className="fontLabel">Email:</label>
                                    <Field type="email" name="email" placeholder="test@gmail.com"/>
                                    <ErrorMessage name="email" component="div" className="errorMessage"/>
                                    <label htmlFor="phone" className="fontLabel">Phone:</label>
                                    <Field type="text" name="phone" placeholder="+79110009922"/>
                                    <ErrorMessage name="phone" component="div" className="errorMessage"/>
                                    <label htmlFor="address" className="fontLabel">Address:</label>
                                    <Field type="text" name="address" placeholder="st.Lenina 9, 99"/>
                                    <ErrorMessage name="address" component="div" className="errorMessage"/>
                                    <div>
                                        <label className="fontLabel">Delivery method:</label>
                                        <div role="group" aria-labelledby="deliveryMethod-group" className="blockSection">
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="deliveryMethod"
                                                    value={DeliveryMethod.Pickup}
                                                />
                                                Pickup
                                            </label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="deliveryMethod"
                                                    value={DeliveryMethod.Courier}
                                                />
                                                Courier
                                            </label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="deliveryMethod"
                                                    value={DeliveryMethod.RussiaPost}
                                                />
                                                Russia post
                                            </label>
                                        </div>
                                        <ErrorMessage name="deliveryMethod" component="div" className="errorMessage" />
                                    </div>
                                    <div>
                                        <label className="fontLabel">Payment type:</label>
                                        <div role="group" aria-labelledby="paymentType-group" className="blockSection">
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentType"
                                                    value={PaymentType.Cash}
                                                />
                                                Cash
                                            </label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="paymentType"
                                                    value={PaymentType.Card}
                                                />
                                                Card
                                            </label>
                                        </div>
                                        <ErrorMessage name="deliveryMethod" component="div" className="errorMessage" />
                                    </div>
                                    <div className="buttonSection">
                                        <button onClick={handleCloseModal}>
                                            Cancel
                                        </button>
                                        <button type="submit" className="submitButton">
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
        </>
    );
}