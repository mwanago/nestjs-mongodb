import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (!(response instanceof Document)) {
        return response;
      }

      const simplifiedResponse: Document = plainToClass(
        classToIntercept,
        response.toObject(),
      );

      if (Array.isArray(simplifiedResponse)) {
        return simplifiedResponse.map((element) => ({
          ...element,
          _id: element._id.toString(),
        }));
      }

      return {
        ...simplifiedResponse,
        _id: simplifiedResponse._id.toString(),
      };
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}

export default MongooseClassSerializerInterceptor;
