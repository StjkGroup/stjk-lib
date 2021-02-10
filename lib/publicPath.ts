/**
 * Create by fay on 2020/4/3 4:20 下午
 */
const removeStartAndEndForwardSlash = (publicPath: any) => {
  if(publicPath.indexOf('/') === 0){
    publicPath = publicPath.substring(1);
  }
  if(publicPath.lastIndexOf('/') === publicPath.length - 1){
    publicPath = publicPath.substr(0, publicPath.length - 1);
  }
  if(publicPath.indexOf('/') === 0 || publicPath.lastIndexOf('/') === publicPath.length - 1){
    publicPath = removeStartAndEndForwardSlash(publicPath);
  }
  return publicPath;
}

export const getPublicPathWithoutStartAndEndForwardSlash = () => {
  const envPublicPath = process.env.PUBLIC_PATH;
  return envPublicPath ? removeStartAndEndForwardSlash(envPublicPath) : envPublicPath;
}
