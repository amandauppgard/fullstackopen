import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <input
        type='text'
        name='filter'
        onChange={(event) => dispatch(filterChange(event.target.value))}
      />
    </div>
  )
}

export default Filter