import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AddForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required')
            .min(6, 'name must be at least 6 characters')
            .max(20, 'name must not exceed 20 characters'),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    return (
        <>
        </>
    );
};
export default AddForm;