
import React from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../hooks/useAppContext';

interface YoutubePlayerModalProps {
  videoId: string;
}

const YoutubePlayerModal: React.FC<YoutubePlayerModalProps> = ({ videoId }) => {
  const { state, dispatch, t } = useAppContext();

  return (
    <Modal isOpen={state.modals.youtube} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 'youtube' })} title={t('vrExperience')}>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{minHeight: '400px'}}
          title="YouTube video player"
        ></iframe>
      </div>
    </Modal>
  );
};

export default YoutubePlayerModal;
