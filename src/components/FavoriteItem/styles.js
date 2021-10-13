import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 14px;
`
export const Title = styled.Text`
  color: #fff;
  font-size: ${props => props.size}px;
  font-weight: bold;
`
export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`
export const Rate = styled.Text`
  padding-left: 4px;
  color: #fff;
  font-size: 12px;
`
export const Details = styled.View`
  flex-direction: row;
  align-items: center;
`
export const DetailsButton = styled.TouchableOpacity`
  background-color: #e72f49;
  width: 85%;
  height: 30px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`
export const DeleteButton = styled.TouchableOpacity`
  width: 15%;
  height: 30px;
  justify-content: center;
  align-items: center;
`