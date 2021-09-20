using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace asp.plugin.core
{
    public static class ObjectUtils
    {
        public static IDictionary<string, object> ToDictionary(this object obj, bool allowNullValues = false)
        {
            IDictionary<string, object> dic = new Dictionary<string, object>();
            var props = obj.GetType().GetProperties();

            if (obj.GetType().IsPrimitive)
            {
                throw new InvalidCastException("Cant convert " + obj.GetType() + "to " +
                                               typeof(IDictionary<string, object>));
            }

            if (obj.GetType().IsGenericType)
            {
                if (obj.GetType().GetGenericTypeDefinition().IsAssignableFrom(typeof(Dictionary<,>)))
                {
                    dic = (IDictionary<string, object>)obj;
                }
            }
            else
            {
                foreach (var prop in props)
                {
                    var val = prop.GetValue(obj);

                    //Debug.LogInfo(prop.ToString());
                    if (val != null && !val.Equals("") || allowNullValues)
                    {
                        dic.Add(prop.Name, val);
                    }
                }
            }
            return dic;
        }

    }

}