import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import { getCategoryInfo } from '@api/goods'
import { BASE_IMG_URL } from '@utils/constant'

import './less/detail.less'

const { Item } = List

export default class Detail extends Component {
  state = {
    parentCategoryName: '', // 一级分类名称
    childCategoryName: '' // 二级分类名称
  }
  componentDidMount () {
    // this.getCategoryName()
  }
  // 获取当前分类名称
  getCategoryName = async () => {
    const { pCategoryId, categoryId } = this.props.location.state.product
    if (pCategoryId === '0') {
      const { data: { name: parentCategoryName } = {} } = await getCategoryInfo(
        { categoryId }
      )
      this.setState({ parentCategoryName })
    } else {
      const [parent, child] = await Promise.all([
        getCategoryInfo({ categoryId: pCategoryId }),
        getCategoryInfo({ categoryId })
      ])
      const { data: { name: parentCategoryName } = {} } = parent
      const { data: { name: childCategoryName } = {} } = child
      this.setState({ parentCategoryName, childCategoryName })
    }
  }
  render () {
    const {
      name,
      desc,
      price,
      detail,
      imgs = []
    } = this.props.location.state.product
    const { parentCategoryName, childCategoryName } = this.state
    // 卡片左上方
    const title = (
      <span>
        <ArrowLeftOutlined
          style={{ marginRight: 10, cursor: 'pointer', color: '#1DA57A' }}
          onClick={this.props.history.goBack}
        />
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='label'>商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='label'>商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='label'>商品价格：</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='label'>所属分类：</span>
            <span>
              {parentCategoryName +
                (childCategoryName ? ` --> ${childCategoryName}` : '')}
            </span>
          </Item>
          <Item>
            <span className='label'>商品图片：</span>
            <span>
              {imgs.map(item => (
                <img
                  className='product-img'
                  key={item}
                  src={BASE_IMG_URL + item}
                  alt='img'
                />
              ))}
            </span>
          </Item>
          <Item>
            <span className='label'>商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
