import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAuth } from "../../hooks/auth.hook";
import { RemixiconComponentType, RiBankCardLine, RiCoinLine, RiEdit2Line, RiEditBoxLine, RiEditLine, RiErrorWarningLine, RiFilePaperFill, RiFileAddFill, RiFileEditFill, RiFileChartFill, RiFileHistoryFill, RiGlobalLine } from "@remixicon/react";

interface Card1Props {
    name: string;
    total: number;
    hidden: boolean;
    index: number;
    image: string;
}
function Card1(props: Card1Props) {
    const auth = useAuth();
    const { name, total, hidden, index, image } = props;
    const Item = styled(Paper)(() => ({
        boxShadow: 'none',
        height: '179px',
        padding: '1.5rem',
    }));
    const className = 'text-primary-500 mx-auto my-auto w-full h-full'
    return (
        <Grid2 xs={12} md={auth.user_payload.role === 'participant' ? 6 : 3} hidden={hidden}>
            <Item>
                <Grid2 className="h-[60px] w-[60px] bg-[#ebffec] rounded-full flex">
                    {
                        image === '/icons/paper.svg' ? <RiFilePaperFill className={className} /> : image === '/icons/wallet.svg' ? <RiCoinLine className={className} /> : image === '/icons/warning.svg' ? <RiErrorWarningLine className={className} /> : image === '/icons/bank-card.svg' ? <RiBankCardLine className={className} /> : image === '/icons/RiFileAddFill.svg' ? <RiFileAddFill className={className} /> : image === '/icons/RiFileEditFill.svg' ? <RiFileEditFill className={className} /> : image === '/icons/RiFileChartFill.svg' ? <RiFileChartFill className={className} /> : image === '/icons/RiFileHistoryFill.svg' ? <RiFileHistoryFill className={className} /> : <RiGlobalLine className={className} />
                    }
                </Grid2>
                <Typography fontSize={16} fontWeight={400} className="text-general-500" marginTop={'0.5rem'}>
                    {name}
                </Typography>
                <Typography fontWeight={600} fontSize={24} className="text-base-dark">
                    {name == 'Total Pendapatan' ? total.toLocaleString?.('id', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    }) : total}
                </Typography>
            </Item>
        </Grid2>
    )
}
export default Card1