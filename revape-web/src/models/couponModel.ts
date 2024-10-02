export interface Coupon {
  _id: string;
  description: string;
  requiredPoints: number;
  type: string;
  discount: number;
  product: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MyCoupons {
  _id: string;
  couponId: string;
  userId: string;
  couponsNumber: number;
  couponCodes: string[];
  createdAt: string;
  updatedAt: string;
  coupon: {
    _id: string;
    description: string;
    requiredPoints: number;
    type: string;
    discount: number;
    product: string;
    createdAt: string;
    updatedAt: string;
  };
}
