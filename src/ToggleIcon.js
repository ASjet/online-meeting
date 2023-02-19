import IconButton from '@mui/material/IconButton';

function ToggleIcon(props) {
    return (
        <IconButton
            onClick={props.onClick}
            style={{
                marginInline: "10px",
                padding: 0,
                color: "#FFFFFF",
            }}
        >
            {props.toggle ? <props.enable /> : <props.disable />}
        </IconButton>
    )
}

export default ToggleIcon;
