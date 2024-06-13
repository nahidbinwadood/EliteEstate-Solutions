/* eslint-disable react/prop-types */

const SoldPropertiesRow = ({ item }) => {
  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white  ">
        <p className="text-gray-900 whitespace-no-wrap">{item.propertyTitle}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">
          {item.propertyLocation}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{item.buyerEmail}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{item.buyerName}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-900 whitespace-no-wrap">
            ${item.offered_price}
          </p>
        </div>
      </td>

      {/* Verify */}
    </tr>
  );
};

export default SoldPropertiesRow;
