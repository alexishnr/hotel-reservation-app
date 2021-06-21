import {TextField, TextFieldProps} from '@material-ui/core'
import {useField} from 'formik'


type FormikTextInputProps = {name: string} & Omit<TextFieldProps, 'value' | 'onChange' | 'helperText'>


export const FormikTextInput = ({name, ...rest}: FormikTextInputProps): JSX.Element => {
    const [field, meta] = useField<string| undefined>(name)
    
    return (
        <TextField 
            name={name}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            {...rest}
            fullWidth
            style={{margin:"auto"}}
        />  
    )
}