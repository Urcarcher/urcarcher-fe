import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field } from 'formik';
import ProgressBar from './ProgressBar';
import { Button } from 'react-bootstrap';
import { useCardContext } from './CardContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import DaumPostcode from './DaumPostcode';  // 주소 컴포넌트 import

const CardForm = () => {
  const { produceCardOffer, setProduceCardOffer } = useCardContext();
  let navigate = useNavigate();

  const [pickupMethod, setPickupMethod] = useState('address'); // 초기값은 'address'

  const styles = {
    formGroupWithLabel: {
      position: 'relative',
      marginBottom: '24px',
    },
    formLabel: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      fontSize: '14px',
      color: '#888',
      transition: 'all 0.2s ease',
      pointerEvents: 'none',
    },
    labelFocused: {
      top: '-8px',
      left: '12px',
      fontSize: '12px',
      color: '#007BFF',
      backgroundColor: '#fff',
      padding: '0 4px',
      borderRadius: '4px',
    },
  };

  return (
    <div style={{ marginTop: '140px'}}>
      <ProgressBar
        stages={['카드 선택', '정보 입력', '동의 사항', '카드 수령', '결제 정보']}
        currentStage={'카드 수령'}
      />
      <Formik
        initialValues={{
          address: "",
          detailAddress: "",
          date: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const fullAddress = `${values.address} ${values.detailAddress}`;
          setProduceCardOffer(prevState => ({
            ...prevState,
            card_pickup: pickupMethod === 'address' ? fullAddress : '공항 수령', // 공항 수령 선택 시 '공항 수령'으로 설정
            pickup_date: values.date  // 날짜를 pickup_date에 할당
          }));

          if (produceCardOffer.card_type_id === 1 || produceCardOffer.card_type_id === 2){
            setTimeout(() => navigate('/card5'), 300);
          }else{
              setTimeout(() => navigate('/card6'), 300);
          }
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <FormikForm onSubmit={handleSubmit} style={{margin: 'auto 50px' }}>
            <h4 style={{ marginTop: '60px', textAlign:'left', fontWeight: 'bold'}}>이제 다 되었어요!</h4>
            <h4 style={{ textAlign:'left', fontWeight: 'bold' }}>카드 수령정보를 입력해주세요</h4>
            <br/>

            <div style={{ marginBottom: '24px',  textAlign:'left' }}>
              <div style={{marginBottom: '8px'}}>카드 수령처</div>
              <label>
                <Field 
                  type="radio" 
                  name="pickupMethod" 
                  value="address" 
                  checked={pickupMethod === 'address'} 
                  onChange={() => setPickupMethod('address')}
                /> 
                &nbsp;주소로 수령
              </label>
              <label style={{ marginLeft: '20px' }}>
                <Field 
                  type="radio" 
                  name="pickupMethod" 
                  value="airport" 
                  checked={pickupMethod === 'airport'} 
                  onChange={() => setPickupMethod('airport')}
                /> 
                &nbsp;공항에서 수령
              </label>
            </div>

            {pickupMethod === 'address' && (
              <div style={styles.formGroupWithLabel}>
                <DaumPostcode setFieldValue={setFieldValue} />
                <label 
                  className="form-label"
                  style={values.address ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
                >
                  {/* 카드 수령처 */}
                </label>
              </div>
            )}

            <div style={styles.formGroupWithLabel}>
              <Field
                id="date"
                name="date"
                type="date"
                className="form-control"
                style={{
                  padding: '40px 12px 8px 12px',
                  fontSize: '14px',
                  color: '#333',
                  borderColor: '#ced4da',
                }}
              />
              <label 
                className="form-label"
                style={values.date ? { ...styles.formLabel, ...styles.labelFocused } : styles.formLabel}
              >
                날짜 선택
              </label>
            </div>

            <div className="mb-3">
              <Button variant="primary" type="submit" style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px'
              }}>
                다음
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default CardForm;
