interface Props {
  title: string;
}
const Title = ({ title }: Props) => {
  return (
    <h6 className='uppercase tracking-widest text-neutral-400  font-light text-opacity-90 text-sm'>
      {title}
    </h6>
  );
};

export default Title;
