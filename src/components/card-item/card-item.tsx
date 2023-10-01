interface CardItemProps {
    label: string
    value: string | number
}

const CardItem = (props: CardItemProps) => (
    <div>
      <p className="text-md font-semibold">{props.label}</p>
      <p className="text-sm">{props.value}</p>
    </div>
  );
  
  export { CardItem };