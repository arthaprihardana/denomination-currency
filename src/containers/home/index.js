import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import _ from 'lodash';
import {checkValue, denomination} from '../../helpers/fractions'
import {currency} from '../../helpers/intl'

class Home extends Component {

    state = {
        readyToSubmit: false,
        forms: {
            amount: null
        },
        errors: {
            err_amount: null
        },
        amount: 0,
        result: [],
        modal: false
    }

    onChange = (key, value) => {
        let { forms, errors } = this.state;
        errors["err_"+key] = null;
        forms[key] = value;
        this.setState({ forms, errors, result: [] }, 
            () => 
                this.onValidate(key).then(val => this.setState({ readyToSubmit: val === undefined }))
            );
    }

    onValidate = async key => {
        let { forms } = this.state;
        let field = await _.findKey(forms, val => _.isEmpty(val));
        return field;
    }

    onSubmit = () => {
        let { forms: { amount }, readyToSubmit} = this.state;
        if(readyToSubmit) {
            if(checkValue(amount)) {
                let v = amount.split(/[Rp.]/).join("");
                let d = denomination(v);
                this.setState({ result: d, amount: v });
            } else {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const { readyToSubmit, result, amount, modal } = this.state;
        return (
            <div className="content">
                <Container>
                    <Row className="row-content">
                        <Col md="12" xs="12" sm="12" className="box-content">
                            <h3>Denominasi Mata Uang (IDR)</h3>
                            <p className="text-muted">
                                Silakan masukkan nilai nominal mata uang yang akan di ekstrak menjadi jumlah pecahan mata uang.<br />
                                Nilai pecahan mata uang terkecil adalah 50 (Lima puluh rupiah),<br />
                                jika Anda memasukan nilai yang lebih kecil dari 50 maka nilai pecahan tidak akan di proses.
                            </p>
                            <Form className="form-container">
                                <FormGroup>
                                    <Input className="half-radius txt-input" type="text" name="amount" id="amount" placeholder="Input nilai, etc: 18.215, Rp17500, Rp17.500,00, Rp 120.325, 005.000, 001000" onChange={e => this.onChange("amount", e.target.value) } autoComplete="off" />
                                </FormGroup>
                            </Form>
                            <Button className="zero-radius" color={readyToSubmit ? "process" : "disabled"} size="lg" onClick={() => this.onSubmit()}>Proses Denominasi</Button>
                        </Col>
                        { result.length > 0 && 
                        <Col md="12" xs="12" sm="12" className="box-content">
                            <h3>Hasil Denominasi</h3>
                            <p className="text-success">Nominal (IDR) : {currency.format(amount)}</p>
                            <ListGroup>
                                { _.map(result, (v, k) => <ListGroupItem>{v}</ListGroupItem>) }
                            </ListGroup>
                        </Col> }
                    </Row>
                </Container>

                <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Petunjuk</ModalHeader>
                    <ModalBody>
                        Input yang anda masukan mengandung format tidak valid. Silahkan coba input nilai dengan format yang benar, contoh :
                        18.215, Rp17500, Rp17.500,00, Rp 120.325, 005.000, 001000
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Ya, Saya mengerti.</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    
}

export default Home;