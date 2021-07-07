import React, { Component, createRef } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { getCategoryList } from '@api/goods'

import UploadImg from '@components/UploadImg'
import RichTextEditor from '@components/RichTextEditor'

import { addProduct } from '@api/goods'

const { Item } = Form
const { TextArea } = Input

export default class AddUpdate extends Component {
  // 是否是修改商品
  isUpdate = true
  // 商品信息
  product = {}
  // 商品图片ref
  imgRef = null
  // 富文本ref
  editorRef = null
  state = {
    options: []
  }
  constructor (props) {
    super(props)
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
    this.imgRef = createRef()
    this.editorRef = createRef()
  }
  componentDidMount () {
    this.getCategorys('0')
  }
  // 获取分类
  getCategorys = async parentId => {
    const { status, data } = await getCategoryList({ parentId })
    if (status !== 0) return
    if (parentId === '0') {
      this.initOptions(data)
    } else {
      return data
    }
  }
  // 设置分类数据option
  setCategorys = (categorys, isLeaf = false) =>
    categorys.map(({ _id: value, name: label }) => ({
      value,
      label,
      isLeaf
    }))
  // 初始化级联选择框配置
  initOptions = async categorys => {
    const {
      isUpdate,
      product: { pCategoryId },
      getCategorys,
      setCategorys
    } = this
    const options = setCategorys(categorys)
    if (isUpdate && pCategoryId !== '0') {
      const data = await getCategorys(pCategoryId)
      const childOptions = setCategorys(data)
      const targetOption = options.find(item => item.value === pCategoryId)
      targetOption.children = childOptions
    }
    this.setState({ options })
  }
  // 商品价格验证规则
  validatorPrice = (_, price) =>
    price * 1 > 0 ? Promise.resolve() : Promise.reject('商品价格必须大于0')
  // 动态获取分类数据
  loadData = async ([option]) => {
    option.loading = true
    const { getCategorys, setCategorys } = this
    const data = await getCategorys(option.value)
    option.loading = false
    if (data && data.length > 0) {
      option.children = setCategorys(data, true)
    } else {
      option.isLeaf = true
    }
    const { options } = this.state
    this.setState({ options })
  }
  // 提交表单
  submit = async params => {
    const { name, desc, price, categoryIds } = params
    const cloneCategoryIds = [...categoryIds]
    if (cloneCategoryIds.length === 1) cloneCategoryIds.unshift('0')
    const [pCategoryId, categoryId] = cloneCategoryIds 
    const { imgRef, editorRef } = this
    const imgs = imgRef.current.getImgs()
    const detail = editorRef.current.getDetail()
    const product = { name, desc, price, pCategoryId, categoryId, imgs, detail }
    const { status } = await addProduct(product)
    if (status !== 0) return message.success('添加商品失败！')
    message.success('添加商品成功！')
    this.props.history.goBack()
  }
  render () {
    const { isUpdate, submit, validatorPrice, loadData, imgRef, editorRef } = this
    const { options } = this.state
    // 头部左侧
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{ marginRight: 10, cursor: 'pointer', color: '#1DA57A' }}
          onClick={this.props.history.goBack}
        />
        <span>{isUpdate ? '修改' : '添加'}商品</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} onFinish={submit}>
          <Item
            label='商品名称'
            name='name'
            rules={[
              { required: true, message: '必须输入商品名称', whitespace: true }
            ]}
          >
            <Input placeholder='请输入商品名称' autoComplete='off' />
          </Item>
          <Item
            label='商品描述'
            name='desc'
            rules={[
              { required: true, message: '必须输入商品描述', whitespace: true }
            ]}
          >
            <TextArea
              placeholder='请输入商品描述'
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            label='商品价格'
            name='price'
            rules={[
              { required: true, message: '必须输入商品价格', whitespace: true },
              { validator: validatorPrice }
            ]}
          >
            <Input
              placeholder='请输入商品价格'
              addonAfter='元'
              autoComplete='off'
            />
          </Item>
          <Item
            label='商品分类'
            name='categoryIds'
            rules={[{ required: true, message: '必须指定商品分类' }]}
          >
            <Cascader
              options={options}
              loadData={loadData}
              placeholder='请指定商品分类'
            />
          </Item>
          <Item label='商品图片'>
            <UploadImg ref={imgRef} />
          </Item>
          <Item label='商品详情' wrapperCol={{span: 20}}>
            <RichTextEditor ref={editorRef} />
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
