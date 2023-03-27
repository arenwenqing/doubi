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
          <li>1、不同盒子内产出的礼物不同，礼物与概率详见附表</li>
          <li>2、不同类型的盒子仅可用对应颜色的钥匙开启</li>
          <li>3、每一种盒子在80次开启内，必出至少1件金色礼物；</li>
          <li>4、您获得的礼物，将在您确认提取后，以抖币的形式进入您指定的账户中；</li>

          <li className='probability-li'>金闪盒子-使用金钥匙:</li>
          <li className='detail-description-li'>
            <span>红色礼物</span>
            <span>1%（额外概率）</span>
            <span>嘉年华、糖果飞船、火箭</span>
          </li>
          <li className='detail-description-li'>
            <span>金色礼物</span>
            <span>5%</span>
            <span>保时捷</span>
          </li>
          <li className='detail-description-li'>
            <span>紫色礼物</span>
            <span>15%</span>
            <span>星星点灯、爱的守护</span>
          </li>
          <li className='detail-description-li'>
            <span>蓝色礼物</span>
            <span>50%</span>
            <span>爱你哟*4、送你花花*4、鲜花*18</span>
          </li>
          <li className='detail-description-li'>
            <span>白色礼物</span>
            <span>30%</span>
            <span>爱你哟、鲜花*6、棒棒糖*8、加油鸭*5</span>
          </li>
          <li className='probability-li'>银光盒子-使用银钥匙:</li>
          <li className='detail-description-li'>
            <span>红色礼物</span>
            <span>1%（额外概率）</span>
            <span>糖果飞船、火箭</span>
          </li>
          <li className='detail-description-li'>
            <span>金色礼物</span>
            <span>5%</span>
            <span>爱的守护</span>
          </li>
          <li className='detail-description-li'>
            <span>紫色礼物</span>
            <span>15%</span>
            <span>亲吻、爱的纸鹤</span>
          </li>
          <li className='detail-description-li'>
            <span>蓝色礼物</span>
            <span>50%</span>
            <span>鲜花*6、棒棒糖*8、加油鸭*5</span>
          </li>
          <li className='detail-description-li'>
            <span>白色礼物</span>
            <span>30%</span>
            <span>大啤酒*9、棒棒糖*2、鲜花*2、玫瑰*25</span>
          </li>
          <li className='probability-li'>铜质盒子-使用金钥匙:</li>
          <li className='detail-description-li'>
            <span>红色礼物</span>
            <span>1%（额外概率）</span>
            <span>火箭</span>
          </li>
          <li className='detail-description-li'>
            <span>金色礼物</span>
            <span>5%</span>
            <span>鲜花*4</span>
          </li>
          <li className='detail-description-li'>
            <span>紫色礼物</span>
            <span>15%</span>
            <span>鲜花*2、大啤酒*9</span>
          </li>
          <li className='detail-description-li'>
            <span>蓝色礼物</span>
            <span>50%</span>
            <span>棒棒糖、鲜花、加油鸭</span>
          </li>
          <li className='detail-description-li'>
            <span>白色礼物</span>
            <span>30%</span>
            <span>小心心、你最好看、大啤酒*2、玫瑰*5</span>
          </li>
        </ul>
      </div>
    </Mask>
  </div>
}
export default DetailDescription