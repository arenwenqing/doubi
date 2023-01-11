import React, { useContext } from 'react'
import { Mask } from 'antd-mobile'
import { Context, setDetailModal } from '../../store'
import './index.less'

const DetailDescription: React.FC = () => {
  const { state, dispatch} = useContext(Context)
  const {
    detailModal
  } = state

  const closeModal = () => {
    dispatch(setDetailModal({
      visible: false
    }))
  }

  return <div className='detail-description-wrapper'>
    <Mask visible={detailModal.visible} opacity={0.8}>
      <div className='detail-description-content'>
        <img onClick={closeModal} className='detail-close-icon' src='https://cdn.tuanzhzh.com/doubi-image/close-modal-icon.png' />
        <div className='detail-title'>详细说明</div>
        <ul className='detail-description-ul'>
          <li>1. 不同的盒子内产出的礼物不同。</li>
          <li>2. 不同类型的盒子仅可使用对应的钥匙开启，如“银光盒子”仅可使用“银钥匙”开启。</li>
          <li>3. 所有盒子均有机会产出至尊礼物，至尊大奖包含“嘉年华”、“糖果飞船”、“火箭。</li>
          <li>4. 您获得的礼物，将在您确认提取后，以抖币的形式进入到您指定的账户中。</li>
          <li>5. 每一种盒子在 80 次开启内必出至少 1 件金色礼物。</li>
          <li>6. 金色礼物分别为：铜质盒子【“爱的守护”、“墨镜”】，银光盒子【“保时捷”、“真的爱你”】，金闪盒子【“Disco”、“私人飞机”】。</li>

          <li className='probability-li'>概率分布：</li>
          <li>至尊礼物：1%（额外概率）</li>
          <li>金色礼物：5%</li>
          <li>紫色礼物：15%</li>
          <li>蓝色礼物：50%</li>
          <li>白色礼物：30%</li>
        </ul>
      </div>
    </Mask>
  </div>
}
export default DetailDescription