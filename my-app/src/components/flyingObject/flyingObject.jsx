import React from 'react';
import PropTypes from 'prop-types';

import FlyingObjectTop from './flyingObjectTop';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFlyingObject } from '../../reducers/valueBeginSelector';
import FlyingObjectBase from './flyingObjectBase';



const FlyingObject = props => {
    let flyingObject = useSelector(getFlyingObject)

    useEffect(()=>{
        //console.log('fddf : '+ flyingObject[0].x)
    },[props.position])
    return <g>
    <FlyingObjectBase position={props.position} />
    <FlyingObjectTop position={props.position} />
  </g>
};

FlyingObject.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
};
export default FlyingObject