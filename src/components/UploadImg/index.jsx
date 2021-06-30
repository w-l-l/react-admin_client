import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { deleteImg } from '@api/goods'
import { BASE_IMG_URL } from '../../utils/constant'

export default class UploadImg extends Component {
  static propTypes = {
    imgs: PropTypes.array
  }
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  }
  constructor (props) {
    super(props)
    let fileList = []
    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((item, index) => ({
        uid: -index,
        name: item,
        status: 'done',
        url: BASE_IMG_URL + item
      }))
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }
  // 获取图片信息
  getImgs = _ => this.state.fileList.map(item => item.name)
  // 图片预览
  handlePreview = ({ url, thumbUrl, name }) => this.setState({
    previewVisible: true,
    previewImage: url || thumbUrl,
    previewTitle: name
  })
  // 关闭图片预览弹窗
  handleCancel = _ => this.setState({
    previewVisible: false,
    previewImage: '',
    previewTitle: ''
  })
  // 操作图片
  handleChange = async ({ file, fileList }) => {
    const { status, response, name } = file
    if (status === 'done') { // 图片上传成功
      if (response.status === 0) {
        const { name, url } = response.data
        file.name = name
        file.url = url
        message.success('图片上传成功')
      } else {
        message.error('图片上传失败')
      }
    } else if (status === 'removed') { // 删除图片
      const { status } = await deleteImg({ name })
      status === 0 ? message.success('删除图片成功') : message.error('删除图片失败')
    }
    this.setState({ fileList })
  }
  render () {
    const { previewVisible, previewImage, previewTitle, fileList } = this.state
    const { handlePreview, handleChange, handleCancel } = this
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 4 }}>Upload</div>
      </div>
    )
    return (
      <>
        <Upload
          action='/api/manage/img/upload'
          accept='image/*'
          name='image'
          listType='picture-card'
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
