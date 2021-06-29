import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Item } = Form
const { TextArea } = Input

export default class AddUpdate extends Component {
  // 是否是修改商品
  isUpdate = true
  // 商品信息
  product = {}
  constructor (props) {
    super(props)
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
  }
  // 商品价格验证规则
  validatorPrice = (_, price) => price * 1 > 0 ? Promise.resolve() : Promise.reject('商品价格必须大于0')
  // 提交表单
  submit = params => {
    console.log(params)
  }
  render () {
    const { isUpdate, submit, validatorPrice } = this
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
        <Form wrapperCol={{ span: 8 }} onFinish={submit}>
          <Item
            label='商品名称'
            name='name'
            rules={[{ required: true, message: '必须输入商品名称', whitespace: true }]}
          >
            <Input placeholder='请输入商品名称' autoComplete='off' />
          </Item>
          <Item
            label='商品描述'
            name='desc'
            rules={[{ required: true, message: '必须输入商品描述', whitespace: true }]}
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
