import 'package:dio/dio.dart';

class NetworkService {
  fetchNewUrl(String url) async {
    print(url);
    Dio dio = Dio();
    Response response;

    FormData data = FormData.fromMap({
      "url": url,
    });
    response = await dio.post('https://eatmyurl.ml/api/new', data: data);
    print(response.data);
    return response.data;
  }
}
