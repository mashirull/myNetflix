
const SamplePrevArrow = (props:any) => {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "flex", background: "rgba(2, 35, 61, 0.500)",height : '100%', width: "30px", alignItems : "center" , padding: "5px" , justifyContent: "center" , fontSize: "30px" , position : 'absolute' , zIndex : "999999999999999999999999999999999999" , left: "0px"}}
        onClick={onClick}
      />
    )

}

export default SamplePrevArrow