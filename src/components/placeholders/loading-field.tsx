import ContentLoader from 'react-content-loader';

const LoadingFieldsPlaceholder = () => {
  return (
    <ContentLoader 
    speed={2}
    width={500}
    height={40}
    backgroundColor="#eaeaea"
    foregroundColor="#bebebe"
  >
    <rect x="15" y="9" width="500" height="20" /> 
  </ContentLoader>
  );
};

export default LoadingFieldsPlaceholder;