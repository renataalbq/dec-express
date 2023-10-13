import ContentLoader from 'react-content-loader';

const LoadingPlaceholder = () => {
  return (
    <div className="w-ful shadow-md p-2 bg-white rounded-lg ">
    <ContentLoader 
    speed={2}
    width={800}
    height={460}
    viewBox="0 0 800 460"
    backgroundColor="#eaeaea"
    foregroundColor="#bebebe"
  >
    <rect x="15" y="15" rx="2" ry="2" width="800" height="70" /> 
    <rect x="15" y="100" rx="0" ry="0" width="800" height="70" /> 
    <rect x="15" y="185" rx="0" ry="0" width="800" height="70" /> 
    <rect x="15" y="270" rx="0" ry="0" width="800" height="70" /> 
    <rect x="15" y="355" rx="0" ry="0" width="800" height="70" />
  </ContentLoader>
    </div>
  );
};

export default LoadingPlaceholder;