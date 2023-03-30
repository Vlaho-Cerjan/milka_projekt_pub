import { Container } from '@mui/material';
import Title from '../app/components/common/title/title';

const Offline = () => {
    return (
        <Container maxWidth={false} sx={{ pt: "16px", pb: "16px" }}>
            <Title
                title="Offline"
            />
            <p>It seems you are offline. Please check your internet connection and try again.</p>
        </Container >
    )
}

export default Offline