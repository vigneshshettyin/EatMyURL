import 'package:eatmyurl/data/network_service.dart';

class Repository{
  final NetworkService networkService;
  Repository({required this.networkService});
  Future fetchNewUrl(String url) async{
    return await networkService.fetchNewUrl(url);
  }
}