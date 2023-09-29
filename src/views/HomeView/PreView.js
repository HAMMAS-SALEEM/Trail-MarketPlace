import React from 'react'
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';

const converter = new marked.Renderer();
    marked.setOptions({
      renderer: converter,
    });

const PreView = ({data, preview}) => {
  const { t } = useTranslation();
    // console.log("Data....", data);
  return (
    <div className='max-h-[500px] h-full overflow-auto px-2'>
      <p className='mb-5 text-lg font-bold'>{t('markdown_view')}</p>
       {
        preview && <div className='ck-content' dangerouslySetInnerHTML={{__html: marked(data)}}/>
       }
    </div>
  )
}

export default PreView