import React from 'react';
import {FormControl, Card, CardActions, Button, TextField, FormControlLabel, InputLabel, Input, FormHelperText, Box, CardContent} from '@mui/material'
import {} from '@mui/icons-material';
function Home() {
    return (
    <>
        <h1>Home Page</h1>
        <Box
            sx={{display: 'flex', justifyContent: 'center'}}
        >
            <Card
                component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 650}}
                noValidate
                autoComplete="off"
            >
                <CardContent>
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel htmlFor="help-desk-user-input">User</InputLabel>
                        <Input type='text' id="help-desk-user-input" aria-describedby='help-desk-user-input-helper' />
                        <FormHelperText id="help-desk-user-input-helper">Enter your user name</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth sx={{m: 1}}>
                        <InputLabel htmlFor="help-desk-email-input">Email</InputLabel>
                        <Input type='email' id="help-desk-email-input" aria-describedby='help-desk-user-input-helper' />
                        <FormHelperText id="help-desk-user-email-helper">Enter your email</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth sx={{m: 1}}>
                        <TextField
                            id="help-desk-description-input"
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="standard"
                        />
                        <FormHelperText id="help-desk-user-description-helper">Tell us about your issue</FormHelperText>
                    </FormControl>
                </CardContent>
                <CardActions sx={{width: '100%'}}>
                    <Button fullWidth variant="contained" size="large">Submit</Button>
                </CardActions>
            </Card>
        </Box>
        
    </>
    )
}

export default Home;